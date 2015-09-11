/* CryptoJS: true */
window.secureShared = {

    // Generate a 256-bit key.
    generatePassphrase: function () {
        // If window.crypto is available, use it.
        var passphrase;
        if (window.crypto && typeof window.crypto.getRandomValues ===
            "function") {
            var array = new Uint8Array(32);
            window.crypto.getRandomValues(array);
            passphrase = window.secureShared.ab2str(array.buffer);
        }
        // Otherwise, use CryptoJS internals.
        else {
            passphrase = CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray
                .random(32));
        }
        return window.secureShared.urlSafeBase64encode(passphrase);
    },

    // Create url-safe base64 string from array buffer.
    ab2str: function (buf) {
        return window.btoa(String.fromCharCode.apply(null, new Uint8Array(
            buf)));
    },

    // Create url-safe base64 string from uInt8Array.
    uInt8Array2str: function (uInt8Array) {
        return window.btoa(String.fromCharCode.apply(null, uInt8Array));
    },

    // Create an array buffer from a string.
    str2ab: function (str) {
        var buf = new ArrayBuffer(str.length); // 2 bytes for each char
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    },

    // Convert a base64 string into something url-safe.
    urlSafeBase64encode: function (input) {
        return input.replace(/\+/g, '-').replace(/\//, '_').replace(
            /\=/g, ''); // '=' is padding char and can be removed
    },

    // Reverse the above process.
    urlSafeBase64decode: function (input) {
        return input.replace(/-/g, '+').replace(/_/, '/');
    },

    fileSize: function (fileSizeInBytes) {
        var i = -1;
        var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB',
            'YB'
        ];
        do {
            fileSizeInBytes = fileSizeInBytes / 1024;
            i++;
        } while (fileSizeInBytes > 1024);

        return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
    },
    uintToString: function(uintArray) {
        var encodedString = String.fromCharCode.apply(null, uintArray),
            decodedString = decodeURIComponent(escape(encodedString));
        return decodedString;
    }
};
