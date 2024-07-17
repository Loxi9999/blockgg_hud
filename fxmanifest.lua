fx_version 'cerulean'
game 'gta5'
lua54 'yes'

shared_script 'lua/config.lua'

client_scripts {
    'lua/client/**'
}

ui_page 'web/index.html'
files {
    'web/index.html',
    'web/dist/**',
    'web/styles/**',
    'web/logo.png'
}

shared_scripts {
    '@ox_lib/init.lua'
}
