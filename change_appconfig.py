import os

APPCONFIG_FILE = {
    'custom': './source/public/appConfig_custom.json',
    'prod': './source/public/appConfig.json',
}

VECTORTILE_URL = {
    'dev': 'http://localhost/mbtiles/test_cur3d',
    'qa': 'http://10.9.11.36/mbtiles/test_cur3d',
    'prod': 'https://vectortiles.usig.buenosaires.gob.ar/cur3d',
}

EPOK_URL = {
    'dev': 'http://localhost:8080',
    'qa': 'https://epok-qa.gcba.gob.ar',
    'prod': 'https://epok.buenosaires.gob.ar',
}

SUB_MENU = {
    '1': 'dev',
    '2': 'qa',
    '3': 'hml',
    '0': 'prod',
}

MENU = {
    'v': 'VECTORTILE_URL',
    'e': 'EPOK_URL',
    '1': '----- Start -----',
    '0': 'Exit',
}

class AppConfig:
    def __init__(self, config_choices):
        self.config_choices = config_choices
        self.create_config()

    def create_config(self):
        # Delete file if exists
        if os.path.exists(APPCONFIG_FILE['custom']):
            os.remove(APPCONFIG_FILE['custom'])

        with open(APPCONFIG_FILE['custom'], mode='wt', encoding='UTF-8') as dev_file:
            with open(APPCONFIG_FILE['prod'], mode='rt', encoding='UTF-8') as prod_file:
                for line in prod_file:
                    for key, value in self.config_choices.items():
                        if line.find(globals()[key]['prod']) != -1:
                            line = line.replace(globals()[key]['prod'], globals()[key][value])

                    dev_file.write(line)
        print(f'{os.linesep}*** Archivo creado ***')


if __name__ == '__main__':
    user_choices = {}

    while True:
        print(f'{os.linesep}Indique tipo y ambiente a sustituir:')
        for choice in MENU:
            print(f'{choice} - {MENU[choice]}')
        user_input_type = input(f'{os.linesep}Ingrese tipo: ')

        if user_input_type == '0':
            break
        elif user_input_type not in MENU:
            print(f'{os.linesep}Opción inválida')
        elif user_input_type == '1' and user_choices:
            print(f'Creando archivo de configuracion con lo seleccionado...')
            print(user_choices)
            AppConfig(user_choices)
            print()
            break
        else:
            for env in SUB_MENU:
                print(f'{env} - {SUB_MENU[env]}')
            user_input_env = input(f'{os.linesep}Ingrese ambiente: ')
            # Save user choices
            if user_input_type != '1':
                project = MENU[user_input_type]
                user_choices[project] = SUB_MENU[user_input_env]
