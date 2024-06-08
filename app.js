document.addEventListener("DOMContentLoaded", function() {
    const baseUrl = "https://localhost:7161";
    const app = document.getElementById('app');
    const playlistsDiv = document.getElementById('playlists');
    const tasksDiv = document.getElementById('tasks');
    const taskListDiv = document.getElementById('taskList');
    let gameKey = '';

    function fetchPlaylists() {
        fetch(`${baseUrl}/Playlists`)
            .then(response => response.json())
            .then(data => {
                data.forEach(playlist => {
                    const div = document.createElement('div');
                    div.className = 'playlist';
                    div.textContent = playlist.name;
                    div.onclick = () => startGame(playlist.id);
                    playlistsDiv.appendChild(div);
                });
            })
            .catch(error => console.error('Error fetching playlists:', error));
    }

    function startGame(playlistId) {
        fetch(`${baseUrl}/Game/Start/${playlistId}`, {
            method: 'POST',
        })
        .then(response => response.text())
        .then(data => {
            gameKey = data;
            loadTasks();
        })
        .catch(error => console.error('Error starting game:', error));
    }

    function loadTasks() {
        fetch(`${baseUrl}/Tasks`, {
            headers: {
                'gameKey': gameKey
            }
        })
        .then(response => response.json())
        .then(data => {
            playlistsDiv.style.display = 'none';
            tasksDiv.style.display = 'block';
            data.forEach(task => {
                const div = document.createElement('div');
                div.className = 'task';
                div.textContent = task.title;
                taskListDiv.appendChild(div);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
    }

    fetchPlaylists();
});
