# Agile Apps

### By 2001 Development

Members: 
- Sam Bowers
- Eric Ekwenibe
- Luke Hostettler
- David Staub

##### Project for CSE 201, archived for future reference.
---

Project uses React + Webpack + Django + Django REST Framework + SQLite.


---

### Demonstration

[Link to mobile demonstration video on youtube](https://www.youtube.com/watch?v=AlQj2QVmjlU&t=1s)

---

### Build Instructions

```cd agile-apps/server/```

Make sure you have python and venv installed, and then run:

```source venv/bin/activate```

This command will then launch the server:

```python manage.py runserver```

---

If you have issues with the port being blocked, instead use:

```python manage.py runserver localhost:PORT```

You can change PORT to any other number (default is 8000), until you get it to run.

---

Website should now be accessible at localhost:8000 on your browser (or whatever port you chose).

NOTE: some may need to use pip3 and python3 instead of pip and python depending on your set-up.
