```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: On click, new note is added to the notes list and page is rendered without reload. New note is sent as json to the server.

    browser-->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Status 201 Created
    deactivate server

    Note right of browser: The page does not reload
```