const shuffle = (array) => {
    let sorted = array.sort(() => Math.random() - 0.5);
    return sorted
}

export const concatAnswers = (test, number) => {
    if (number < 10 ) {
        let arr = test[0] ? [ 
            ...test[`${number}`].incorrect_answers, 
            test[`${number}`].correct_answer
            ] : null
        return shuffle(arr)  
    } 
}