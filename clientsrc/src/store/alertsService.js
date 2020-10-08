import Swal from "sweetalert2"
export default class NotificationService {
    static async addName() {
        try {
            let res = await Swal.fire({
                title: "<h2 style='color:#FF88FF'>Enter your name</h2>",
                input: 'text',
                inputPlaceholder: "Your name here...",
                showCancelButton: false,
                confirmButtonText: "Confirm",
                confirmButtonColor:  "#FF9900",
                allowOutsideClick: false,
                background: "#171228",
                inputValidator: (value) => {
                    if (!value) {
                      return "<h2 style='color:#81C8FF;'>You need to write something!</h2>"
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
                title: "<h2 style='color:#FF88FF'>Are You Sure?</h2>",
                icon: 'warning',
                iconColor: "#FF88FF",
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonColor: "#81C8FF",
                confirmButtonColor:  "#FF9900",
                background: "#171228",
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
                icon: "info",
                iconColor: "#FF88FF",
                title: "<h2 style='color:#FF88FF'>Somethings off...</h2>",
                html: "<h2 style='color:#81C8FF'>Couldnt find those games boss. Make sure your steam games are public and try again.</h2>",
                background: "#171228"
              })
        } catch (error) {
            
        }
    }

    static async gameLength(length){
        Swal.fire({
            icon: 'error',
            title: 'Somethings off...',
            text: `This poll can only have ${length} games`,
            footer: `<router-link :to="{ name: 'Faq' }">learn more about this error</router-link>`,
            background: "#171228"
        })
    }
}