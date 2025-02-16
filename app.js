const cells = document.querySelectorAll('.cell');
        const restartButton = document.getElementById('restartButton');
        const winningMessage = document.getElementById('winning-message');
        let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameOver = false;

        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]             // Diagonals
            ];

            for (let pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    gameOver = true;
                    return gameBoard[a];
                }
            }
            if (!gameBoard.includes("")) {
                gameOver = true;
                return "Draw"; // Check for a draw
            }
            return null;
        }

        function handleCellClick(e) {
            const cell = e.target;
            const index = cell.id;

            if (gameBoard[index] || gameOver) {
                return;
            }

            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;

            const winner = checkWinner();
            if (winner) {
                if(winner === "Draw"){
                    winningMessage.textContent = "It's a Draw!";
                }
                else{
                    winningMessage.textContent = `${winner} wins!`;
                }
                winningMessage.classList.add('show');
                winningMessage.classList.remove('hide');

            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }

        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });

        restartButton.addEventListener('click', () => {
             currentPlayer = 'X';
             gameBoard = ['', '', '', '', '', '', '', '', ''];
             gameOver = false;
             cells.forEach(cell => cell.textContent = '');
             winningMessage.textContent = "";
             winningMessage.classList.remove('show');
             winningMessage.classList.add('hide');

        });