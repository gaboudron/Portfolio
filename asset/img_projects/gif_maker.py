import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from mpl_toolkits.mplot3d import Axes3D

def epidemie():
    # Taille de la grille 3D
    size = 10

    # Initialisation de la grille (0 = sain, 1 = infecté)
    grid = np.zeros((size, size, size))
    grid[size//2, size//2, size//2] = 1  # Point de départ de l'infection

    # Définition des directions possibles pour la propagation
    directions = [(1, 0, 0), (-1, 0, 0), (0, 1, 0), (0, -1, 0), (0, 0, 1), (0, 0, -1)]

    # Fonction pour propager l'infection
    def propagate(grid):
        new_grid = grid.copy()
        infected_positions = np.argwhere(grid == 1)
        for x, y, z in infected_positions:
            for dx, dy, dz in directions:
                nx, ny, nz = x + dx, y + dy, z + dz
                if 0 <= nx < size and 0 <= ny < size and 0 <= nz < size and new_grid[nx, ny, nz] == 0:
                    if np.random.rand() < 0.3:  # Probabilité d'infection
                        new_grid[nx, ny, nz] = 1
        return new_grid

    # Création de la figure
    fig = plt.figure(figsize=(6, 6))
    ax = fig.add_subplot(111, projection='3d')
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_zticks([])
    ax.set_xlim(0, size)
    ax.set_ylim(0, size)
    ax.set_zlim(0, size)
    ax.set_facecolor("#1E1E1E")

    # Liste pour stocker les cubes infectés
    infected_cubes = []

    # Rendre le fond transparent ou sombre
    fig.patch.set_facecolor('none')  # Aucun fond pour la figure
    ax.set_facecolor("#1E1E1E")      # Fond sombre pour l'axe

    def update(frame):
        global grid
        ax.cla()
        ax.set_xticks([])
        ax.set_yticks([])
        ax.set_zticks([])
        ax.set_xlim(0, size)
        ax.set_ylim(0, size)
        ax.set_zlim(0, size)
        ax.set_facecolor("#1E1E1E")

        grid = propagate(grid)
        infected_positions = np.argwhere(grid == 1)
        
        for x, y, z in infected_positions:
            ax.bar3d(x, y, z, 1, 1, 1, color="red", alpha=0.7, shade=True)

    # Animation
    ani = animation.FuncAnimation(fig, update, frames=15, interval=800, repeat=False)

    # Sauvegarde du GIF
    gif_path = "asset/img_projects/virus_propagation.gif"
    # Ajuster les marges de la figure
    fig.tight_layout(pad=0)

    # Sauvegarde du GIF
    ani.save(gif_path, writer="pillow", fps=5, savefig_kwargs={'transparent': True, 'facecolor': 'none'})

    gif_path


def sudoku():
    # Définition de la grille de Sudoku initiale (vide)
    sudoku_grid = np.zeros((9, 9), dtype=int)

    # Solution exemple (peut être remplacée par une vraie résolution dynamique)
    solution = np.array([
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ])

    # Création de l'animation
    fig, ax = plt.subplots(figsize=(6, 6))
    ax.set_xticks(np.arange(10) - 0.5, minor=False)
    ax.set_yticks(np.arange(10) - 0.5, minor=False)
    ax.grid(which="major", color="black", linestyle="-", linewidth=1.5)
    ax.tick_params(bottom=False, left=False, labelbottom=False, labelleft=False)
    ax.set_xlim(-0.5, 8.5)
    ax.set_ylim(8.5, -0.5)
    ax.set_facecolor("#1E1E1E")  # Couleur de fond inspirée de VS Code

    # Texte pour afficher les chiffres du Sudoku
    texts = np.array([[ax.text(j, i, "", fontsize=16, color="white", ha="center", va="center") for j in range(9)] for i in range(9)])

    def update(frame):
        i, j = divmod(frame, 9)
        sudoku_grid[i, j] = solution[i, j]
        texts[i, j].set_text(str(solution[i, j]))

    ani = animation.FuncAnimation(fig, update, frames=81, interval=100, repeat=False)

    # Sauvegarde du GIF
    gif_path = "asset/img_projects/sudoku.gif"
    # Ajuster les marges de la figure
    fig.tight_layout(pad=0)

    # Sauvegarde du GIF
    ani.save(gif_path, writer="pillow", fps=5, savefig_kwargs={'transparent': True, 'facecolor': 'none'})

    gif_path


def taquin():
    # Taille du jeu de taquin (4x4)
    size = 4

    # Grille initiale mélangée
    initial_grid = np.array([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 0],
        [13, 14, 15, 12]
    ])

    # Mouvements pour résoudre le taquin (simples déplacements de la case vide)
    moves = [(2, 3), (1, 3), (1, 2), (0, 2), (0, 3), (1, 3), (2, 3), (3, 3)]

    # Création de l'animation
    fig, ax = plt.subplots(figsize=(4, 4))
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_xlim(-0.5, size - 0.5)
    ax.set_ylim(size - 0.5, -0.5)
    ax.set_facecolor("#1E1E1E")

    # Création des tuiles
    tiles = {}
    for i in range(size):
        for j in range(size):
            if initial_grid[i, j] != 0:
                tiles[(i, j)] = ax.text(j, i, str(initial_grid[i, j]), fontsize=16, color="white", 
                                        ha="center", va="center", bbox=dict(facecolor="gray", edgecolor="white"))

    def update(frame):
        empty_i, empty_j = np.argwhere(initial_grid == 0)[0]
        move_i, move_j = moves[frame]
        
        # Échanger les valeurs dans la grille
        initial_grid[empty_i, empty_j], initial_grid[move_i, move_j] = initial_grid[move_i, move_j], initial_grid[empty_i, empty_j]
        
        # Déplacer la tuile dans l'affichage
        if (move_i, move_j) in tiles:
            tiles[(move_i, move_j)].set_position((empty_j, empty_i))
            tiles[(empty_i, empty_j)] = tiles.pop((move_i, move_j))

    ani = animation.FuncAnimation(fig, update, frames=len(moves), interval=300, repeat=False)

    # Sauvegarde du GIF
    gif_path = "asset/img_projects/jeu_taquin.gif"
    # Ajuster les marges de la figure
    fig.tight_layout(pad=0)

    # Sauvegarde du GIF
    ani.save(gif_path, writer="pillow", fps=5, savefig_kwargs={'transparent': True, 'facecolor': 'none'})

    gif_path


if __name__=="__main__":
    taquin()