<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Option;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        dd('SurveyController index');
        return view('AddSurvey');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'question' => 'required',
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
            $question = Question::create([
                'question' => $request->question,
                'question_type' => $request->question_type,
            ]);

            if ($request->question_type === 'MCQs') {
                foreach ($request->options as $optionText) {
                    Option::create([
                        'questions_id' => $question->id,
                        'option_text' => $optionText,
                    ]);
                }
            } elseif ($request->question_type === 'Text Field') {
                Option::create([
                    'questions_id' => $question->id,
                    'option_text' => $request->text_field,
                ]);
            } elseif ($request->question_type === 'True/False') {
                Option::create([
                    'questions_id' => $question->id,
                    'option_text' => $request->true_false,
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
