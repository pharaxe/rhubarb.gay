const handleSuccess = (data) => {
  // Hide loading spinner
  const loadingSpinner = document.querySelector(".loading-spinner");
  if (loadingSpinner) {
    loadingSpinner.classList.add("hidden");
  }

  // Check if user has t-shirt giveaway tag
  const hasGiveawayTag =
    data && data.tags && data.tags.includes("t-shirt-giveaway-feb-2026");

  if (hasGiveawayTag) {
    if (data.type === "unactivated") {
      // Show giveaway inactive message
      const giveawayInactiveContent = document.querySelector(
        ".giveaway-inactive-content",
      );
      if (giveawayInactiveContent) {
        giveawayInactiveContent.classList.remove("hidden");
        giveawayInactiveContent.classList.add("contents");
      }
    } else if (data.type === "regular") {
      // Show giveaway success message
      const giveawaySuccessContent = document.querySelector(
        ".giveaway-success-content",
      );
      if (giveawaySuccessContent) {
        giveawaySuccessContent.classList.remove("hidden");
        giveawaySuccessContent.classList.add("contents");
      }
    } else {
      // Fallback to regular confirm content for other types with giveaway tag
      const confirmContent = document.querySelector(".confirm-content");
      if (confirmContent) {
        confirmContent.classList.remove("hidden");
        confirmContent.classList.add("contents");
      }
    }
  } else {
    // No giveaway tag - use regular newsletter logic
    if (data && data.type === "regular") {
      // Show the regular success content
      const successContent = document.querySelector(".success-content");
      if (successContent) {
        successContent.classList.remove("hidden");
        successContent.classList.add("contents");
      }
    } else {
      // Show the regular confirm content
      const confirmContent = document.querySelector(".confirm-content");
      if (confirmContent) {
        confirmContent.classList.remove("hidden");
        confirmContent.classList.add("contents");
      }
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
