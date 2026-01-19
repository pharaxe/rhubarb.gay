// Get email address from query parameters and call subscriber API

const handleSuccess = (data) => {
  // Hide loading spinner
  const loadingSpinner = document.querySelector(".loading-spinner");
  if (loadingSpinner) {
    loadingSpinner.classList.add("hidden");
  }

  // Check if data has type property and if it's 'regular'
  if (data && data.type === "regular") {
    // Show the success content
    const successContent = document.querySelector(".success-content");
    if (successContent) {
      successContent.classList.remove("hidden");
      successContent.classList.add("contents");
    }
  } else {
    // Show the confirm content for any other type or no type
    const confirmContent = document.querySelector(".confirm-content");
    if (confirmContent) {
      confirmContent.classList.remove("hidden");
      confirmContent.classList.add("contents");
    }
  }
};

const handleError = () => {
  // Hide loading spinner
  const loadingSpinner = document.querySelector(".loading-spinner");
  if (loadingSpinner) {
    loadingSpinner.classList.add("hidden");
  }

  // Show the default content, asking for them to confirm their email
  const confirmContent = document.querySelector(".confirm-content");
  if (confirmContent) {
    confirmContent.classList.remove("hidden");
    confirmContent.classList.add("contents");
  }
};

(function () {
  // Parse URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const emailAddress = urlParams.get("email_address");

  if (emailAddress) {
    // Make API call
    const apiUrl = `https://api.rhubarb.gay/subscriber?email_address=${encodeURIComponent(
      emailAddress,
    )}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Subscriber API response:", data);
        handleSuccess(data);
      })
      .catch((error) => {
        console.error("Error calling subscriber API:", error);
        handleError();
      });
  } else {
    console.log("No email_address parameter found in URL");
    handleError();
  }
})();
