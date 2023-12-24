import axios from "axios"

class PostUser {

    postUserService({nome, email, senha}) {
        return axios.post(`http://localhost:3333/add`, {
            nome,
            email,
            senha
        })
    }
    getUSerService() {
        return axios.get('http://localhost:3333/list')
    }

}
export default PostUser