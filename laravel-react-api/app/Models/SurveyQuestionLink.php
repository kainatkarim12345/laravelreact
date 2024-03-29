<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestionLink extends Model
{
    use HasFactory;
    protected $fillable = ['questions_id', 'survey_id'];
}
