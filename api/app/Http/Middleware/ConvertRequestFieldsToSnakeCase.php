<?php declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use function is_array;

class ConvertRequestFieldsToSnakeCase
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $request->replace($this->convert($request->all()));
        return $next($request);
    }

    private function convert($data)
    {
        if (!is_array($data)) {
            return $data;
        }

        $replaced = [];
        foreach ($data as $key => $value) {
            $replaced[Str::snake($key)] = is_array($value)
                ? $this->convert($value)
                : $value;
        }
        return $replaced;
    }
}

