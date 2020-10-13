export interface User {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isAdmin: boolean
}


export interface Resource {
    id: number,
    title: string,
    description: string,
    type: string,
    link: string
    tags?: Tag[]
}

export interface SkillArray {
    id: number,
    activeLearning: boolean | undefined,
    tag: Tag,
    tagId: number,
}

export interface Tag {
    skillName: string,
}
