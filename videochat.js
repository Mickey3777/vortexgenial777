const blockedUsers = JSON.parse(localStorage.getItem('blockedUsers')) || [];

// Función para bloquear un usuario

function blockUser(userId) {

    if (!blockedUsers.includes(userId)) {

        blockedUsers.push(userId);

        localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));

        alert(`Usuario ${userId} bloqueado.`);

    }

}

// Función para verificar si un usuario está bloqueado

function isUserBlocked(userId) {

    return blockedUsers.includes(userId);

}

// Ejemplo de cómo usar estas funciones

function initiateCallToUser(userId) {

    if (isUserBlocked(userId)) {

        alert(`No puedes llamar al usuario ${userId} porque está bloqueado.`);

        return;

    }

    // Código para iniciar la llamada al usuario

}

// Botón para bloquear usuario (aquí deberías proporcionar un método para ingresar el ID del usuario)

const blockButton = document.getElementById('blockButton');

blockButton.addEventListener('click', () => {

    const userId = prompt('Ingrese el ID del usuario a bloquear:');

    blockUser(userId);

});
