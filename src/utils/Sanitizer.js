// This Sanitizer class contains sanitize() method to sanitize the input form data

class Sanitizer {

    static sanitize(input) {
        let inputStr = input.toString(); // convert to a string
        inputStr = inputStr.trim(); // remove leading and trailing white spaces
        return inputStr.replace(/\<script\>/ig, ''); // Remove <script> tags
    }
}

export default Sanitizer;