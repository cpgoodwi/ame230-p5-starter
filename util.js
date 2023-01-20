
function* makeOscilator(start, max, maxTurns = Infinity, step = 1) {
    let iterationCount = 0;
    let turnCount = 0;

    let current = start;
    while (turnCount < maxTurns) {
        iterationCount++;

        if (current + step > max || current + step < start) {
            step = -step;
            turnCount++;
        }
        
        current += step;
        yield current;
    }

    return iterationCount;
}