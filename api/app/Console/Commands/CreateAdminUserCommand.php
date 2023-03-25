<?php declare(strict_types=1);

namespace App\Console\Commands;

use App\UseCases\AdminUser\CreateAction;
use App\UseCases\AdminUser\CreateEntity;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdminUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin_user:create {name} {email} {password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create Admin User';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $name = $this->argument("name");
        $email = $this->argument("email");
        $password = Hash::make($this->argument("password"));

        $action = new CreateAction();
        $entity = new CreateEntity([
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ]);
        $action($entity);
        return Command::SUCCESS;
    }
}
