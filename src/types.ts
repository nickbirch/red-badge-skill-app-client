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
    id?: number | null | undefined,
    activeLearning: boolean | undefined,
    tag: Tag,
    tagId?: number | null | undefined,
}

export interface Tag {
    skillName: string,
}

export interface UserSkills extends User {
    userSkills: SkillArray[]
}
