<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;
    protected $fillable = ['added_by', 'survey_type', 'survey_name','price_within_timer','price_without_timer','start_time','expire_at','is_active','published_at'];
}
