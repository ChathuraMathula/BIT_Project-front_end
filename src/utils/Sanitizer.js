// This Sanitizer class contains sanitize() method to sanitize the input form data

class Sanitizer {
  static sanitize(input) {
    if (typeof input === "string") {
      return input.replace(/\<script\>/gi, ""); // Remove <script> tags
    }
    return input;
  }
}

export default Sanitizer;
