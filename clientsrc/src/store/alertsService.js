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
                background: "#171228",
                inputValidator: (value) => {
                    if (!value) {
                      return "<h2 style='color:#81C8FF;'>You need to write something!</h2>"
                    }
                  }
            })
            return res
        } catch (error) {
            console.error(error)
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
            console.error(error)
        }
    }
    static async confirmLeave(text = "You won't be able to revert this!") {
        try {
            let res = await Swal.fire({
                title: "<h2 style='color:#FF88FF'>Are You Sure?</h2>",
                icon: 'warning',
                iconColor: "#FF88FF",
                showCancelButton: true,
                confirmButtonText: 'Yes, leave the room!',
                cancelButtonColor: "#81C8FF",
                confirmButtonColor:  "#FF9900",
                background: "#171228",
            })
            if (res.value) {
                return true
            }
            return false
        } catch (error) {
            console.error(error)
        }
    }

    static async steamNotice(){
        try {
            Swal.fire({
                icon: "info",
                iconColor: "#FF88FF",
                title: "<h2 style='color:#FF88FF'>Somethings off...</h2>",
                html: "<h2 style='color:#81C8FF'>Couldnt find those games boss. Make sure your steam games are public and try again.</h2>",
                confirmButtonColor:  "#FF9900",
                background: "#171228"
              })
        } catch (error) {
            console.error(error)
        }
    }
    static async nameNotice(){
        try {
            Swal.fire({
                icon: "info",
                iconColor: "#FF88FF",
                title: "<h2 style='color:#FF88FF'>Somethings off...</h2>",
                html: "<h2 style='color:#81C8FF'>We couldn't find your name, either wait a moment or try logging out and back in again.</h2>",
                confirmButtonColor:  "#FF9900",
                background: "#171228"
              })
        } catch (error) {
            console.error(error)
        }
    }

    static async gameLength(length){
        try{
        Swal.fire({
            icon: 'error',
            iconColor: "#FF88FF",
            title: "<h2 style='color:#FF88FF'>Somethings off...</h2>",
            html: `<h2 style='color:#81C8FF'> This poll can only have ${length} games</h2>`,
            confirmButtonColor:  "#FF9900",
            background: "#171228"
        })
        } catch(error){
            console.error(error)
        }
    }

    static async actionNotice(title= "You did a thing", timer = 1500){
        try {
        Swal.fire({
          title: `<h3 style="color: #FF88FF">${title}</h3>`,
          icon: "success",
          iconColor: "#FF88FF",
          timer: timer,
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          background: "#171228"
        })
        } catch (error) {
            console.error(error)
        }
    }
}