import Swal from "sweetalert2"
export default class NotificationService {
    static async addName() {
        try {
            let res = await Swal.fire({
                title: "Enter your name",
                input: 'text',
                showCancelButton: false,
                confirmButtonText: 'Yes',
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
}