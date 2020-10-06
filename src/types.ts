export interface User {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isAdmin: boolean
}


export interface Resource {
    title: string,
    description: string,
    type: string,
    link: string
}

export interface Skill {
    skillName: string,
    activeLearning: boolean
}

export interface Tag {
    skillName: string
}