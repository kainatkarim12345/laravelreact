<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Survey;
use App\Models\SurveyQuestionLink;
use Illuminate\Support\Facades\Auth;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'survey_status' => 'required',
            'price_without_timer' => 'required',
            'price_within_timer' => 'required',
            'survey_type' => 'required',
            'selectedQuestions' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422); 
        } else {

            $addedBy = Auth::user()->id;
            $surveyName = $request->name;
            $surveyType = $request->survey_type;
            $surveyStatus = $request->survey_status;
            $priceWithinTimer = $request->price_within_timer;
            $priceWithoutTimer = $request->price_without_timer;
            $startTime = $request->timer_duration;
            $publishAt = $request->publish_at;
            $expireAt = $request->expire_at;


            if($surveyType === 'survey'){
           
                $survey = Survey::create([
                    'added_by' => $addedBy,
                    'survey_type' => $surveyType,
                    'survey_name' => $surveyName,
                    'price_within_timer' => $priceWithinTimer,
                    'price_without_timer' => $priceWithoutTimer,
                    'start_time' => $startTime,
                    'expire_at' => $expireAt,
                    'is_active' => $surveyStatus,
                    'published_at' => $publishAt,
                ]);

            } elseif ($surveyType === 'profile') {
             
                $survey = Survey::create([
                    'added_by' => $addedBy,
                    'survey_type' => $surveyType,
                    'survey_name' => $surveyName,
                    'price_within_timer' => $priceWithinTimer,
                    'price_without_timer' => $priceWithoutTimer,
                    'is_active' => $surveyStatus,
                ]);
            }

            foreach ($request->selectedQuestions as $questionId) {
         
                SurveyQuestionLink::create([
                    'survey_id' => $survey->id,
                    'questions_id' => $questionId,
                ]);
            }       

            return response()->json('Survey Created');
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
