# Setup

Dependencies:

```bash
cd server
export PIPENV_VENV_IN_PROJECT=1
pipenv install 
```

Migrations:

```bash
export FLASK_APP=todos/app.py
pipenv run flask db upgrade
```

Server:

```bash
pipenv run flask --debug run
```

Flask API will be running on port `5000`.
