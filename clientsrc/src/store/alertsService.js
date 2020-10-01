import Swal from "sweetalert2"
export default class NotificationService {
    static async confirmClose(text = "You won't be able to revert this!") {
        try {
            let res = await Swal.fire({
                title: "Are You Sure?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, close it!',
                
            })
            if (res.value) {
                return true
            }
            return false
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