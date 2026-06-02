#!/bin/bash

# Variables du compte
EMAIL="admin@repower-rdc.com"
PASSWORD="Ad.repower@2026"
NAME="admin repower"

# Commande artisan pour créer un utilisateur
php artisan tinker --execute="
use App\\Models\\User;
User::create([
    'name' => '$NAME',
    'email' => '$EMAIL',
    'password' => bcrypt('$PASSWORD'),
]);
"
