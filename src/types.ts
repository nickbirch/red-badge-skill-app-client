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

export interface SkillArray {
    id: number,
    activeLearning: boolean | undefined,
    tag: Tag,
    tagId: number,
}

interface Tag {
    skillName: string,
}
