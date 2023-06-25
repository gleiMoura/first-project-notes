import { faker } from "@faker-js/faker"
import { Post } from "../../interface";

const createMock = (): Post => {
    return (
        {
            id: faker.number.int(),
            userId: faker.number.int(),
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
            cover: faker.image.url()
        }
    )
}

export default createMock;