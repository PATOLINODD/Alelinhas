class Grid {
    constructor(width, height, size) {
        this.cells = [];
        this.totalColumns = Math.ceil(width / size);
        this.totalRows = Math.ceil(height / size);
        this.size = size;
        this.potentialCollisions = [];
        this.cells = new Array(this.totalColumns * this.totalRows)
            .fill(null)
            .map(() => []);
    }

    getIndex(x, y) {
        const column = Math.floor(x / this.size);
        const row = Math.floor(y / this.size)
        const index = (row * this.totalColumns) + column;
        return { column, row, index };
    }

    addEntity(entity) {
        const { index } = this.getIndex(entity.x, entity.y);
        if (index >= 0 && index < this.cells.length) {
            this.cells[index].push(entity)
        }
    }

    clear() {
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].length = 0;
        }
    }

    /**
     * 
     * @param {*} curEntity 
     */
    getNeighbors(curEntity) {
        const potentialCollisions = []
        const entityCell = this.getIndex(curEntity.x, curEntity.y);
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const [neighborCol, neighborRow] = [entityCell.column + i, entityCell.row + j];
                if (neighborCol >= 0 && neighborCol < this.totalColumns &&
                    neighborRow >= 0 && neighborRow < this.totalRows) {
                    //safe to do something
                    const index = (neighborRow * this.totalColumns) + neighborCol;
                    potentialCollisions.push(...this.cells[index])
                }
            }
        }

        return potentialCollisions;
    }
}