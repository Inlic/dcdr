import Swal from "sweetalert2"
export default class NotificationService {
    static async addName() {
        try {
            let res = await Swal.fire({
                title: "Enter your name",
                input: 'text',
                showCancelButton: false,
                confirmButtonText: 'Yes',
                allowOutsideClick: false,
                inputValidator: (value) => {
                    if (!value) {
                      return 'You need to write something!'
                    }
                  }
            })
            return res
        } catch (error) {

        }
    }
    static async confirmDelete(text = "You won't be able to revert this!") {
        try {
            let res = await Swal.fire({
                title: "Are You Sure?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                
            })
            if (res.value) {
                return true
            }
            return false
        } catch (error) {

        }
    }

    static async steamNotice(){
        try {
            Swal.fire({
                icon: 'error',
                title: 'Somethings off...',
                text: 'Couldnt find those games boss. Make sure your steam games are public and try again',
                footer: `<router-link :to="{ name: 'Faq' }">learn more about this error</router-link>`
              })
        } catch (error) {
            
        }
    }

    static async gameLength(length){
        Swal.fire({
            icon: 'error',
            title: 'Somethings off...',
            text: `This poll can only have ${length} games`,
            footer: `<router-link :to="{ name: 'Faq' }">learn more about this error</router-link>`
        })
    }
}