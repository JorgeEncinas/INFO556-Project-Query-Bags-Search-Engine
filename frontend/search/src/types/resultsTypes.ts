 export type ResultEntries = {
    [entryNumber : number] : string
}

export type Results = {
    title: ResultEntries,
    body: ResultEntries,
    url: ResultEntries
}

export type SuggestedTerm = [
    string,
    number
] //Defines a tuple
// As seen in https://www.w3schools.com/typescript/typescript_tuples.php

export type Suggestions = {
    related_words : Array<SuggestedTerm>
}