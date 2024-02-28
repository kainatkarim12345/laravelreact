<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Option;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }


    public function getQuestions(Request $request)
    {
        $surveyType = $request->query('type');
        
        $questions = DB::table('questions')
                    ->select('option.*','questions.*', 'question.id AS question_id')
                    ->join('options', 'options.questions_id', '=', 'questions.id')
                    ->select('questions.id as question_id', 'questions.question', 'questions.question_type', 'questions.question_for', 'options.option_text')
                    ->where('questions.question_for', '=', $surveyType)
                    ->get();

        $groupedQuestions = [];
        foreach ($questions as $question) {
            $groupedQuestions[$question->question_id]['question'] = $question->question;
            $groupedQuestions[$question->question_id]['question_id'] = $question->question_id;
            $groupedQuestions[$question->question_id]['question_type'] = $question->question_type;
            $groupedQuestions[$question->question_id]['question_for'] = $question->question_for;
            $groupedQuestions[$question->question_id]['options'][] = $question->option_text;
        }

        $uniqueQuestions = array_values($groupedQuestions);

        return response()->json($uniqueQuestions);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'question' => 'required',
            'question_for' => 'required',
            'question_type' => 'required|in:MCQs,Text Field,True/False',
            'options.*' => 'required_if:question_type,MCQs',
            'text_field' => 'required_if:question_type,Text Field',
            'true_false' => 'required_if:question_type,True/False|in:True,False',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422); 
        } else {
            if($request->question_for === 'survey'){
                $question_for = $request->question_for;
            }else{
                $question_for = $request->question_for;
            }
            $question = Question::create([
                'question' => $request->question,
                'question_type' => $request->question_type,
                'question_for' => $question_for,
            ]);

            if ($request->question_type === 'MCQs') {
                foreach ($request->options as $optionText) {
                    Option::create([
                        'questions_id' => $question->id,
                        'option_text' => $optionText,
                        'question_for' => $question_for,
                    ]);
                }
            } elseif ($request->question_type === 'Text Field') {
                Option::create([
                    'questions_id' => $question->id,
                    'option_text' => $request->text_field,
                    'question_for' => $question_for,
                ]);
            } elseif ($request->question_type === 'True/False') {
                Option::create([
                    'questions_id' => $question->id,
                    'option_text' => $request->true_false,
                    'question_for' => $question_for,
                ]);
            }

            return response()->json('Successfully saved');
        }
    }




    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
