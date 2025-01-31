import { ChatQuestion } from "@/types/message";

const defaultQuestion = {
    message: "...",
    type:"question",
    disabled: true,
    suggestions: []
}

const getQuestionBasedOnValueAndOrder = (questions, order, value): ChatQuestion => {
    const selectedQuestion = questions.find((q) => {
        if (!!q.lower && !!q.higher && !!value) {
            return value >= q.lower && value <= q.higher && q.order === order
        }
        return q.order === order;
    });
    return selectedQuestion ?? defaultQuestion;
}

const randomDate = (start, end) => {
    var date = new Date(+start + Math.random() * (end - start));
    return date;
}

export {
    randomDate,
    getQuestionBasedOnValueAndOrder
}