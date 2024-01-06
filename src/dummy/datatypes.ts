export type LionListType = {
    applicantId: number,
    part: string,
    name: string,
    studentId: string,
    score: number,
    isEvaluated: boolean,
    result: string,
    phone: string,
    //part별에서 다른 변수명 추가
    id: number,
    evaluated: string,
    status: string,
}

export type LionDetailAnsType = {
    answerId: number,  // 답변 식별자
    sequence: number,  // 질문 순서
    tag: string,  // 태그
    question: string,  // 질문
    answer: string,
}

export type LionDetailType = {
    id: number,
    name: string,
    major: string,
    multimajor: string,
    studentId: string,
    gender: string,
    semester: string,
    part: string,
    email: string,
    phone: string,
    score: number,
    evaluated: number,
    portfolio: string,
    answers: LionDetailAnsType[],
}

export type GetQuestType = {
    id: number,
    sequence: number,
    isDetermined: boolean,
    createdAt: string,
    content: string,
    tagId: number,
    tagContent: string,
    writerId: number,
    writerName: string,
}

export type DocQuestTagType = {
    label: string,
    value: number,
}