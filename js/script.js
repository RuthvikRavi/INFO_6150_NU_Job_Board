window.onload = () => {
  console.log("loaded");
  setTimeout(() => {
    var cardTitle = document.getElementById("cardTitle");
    var cardBody = document.getElementById("cardBody");

    cardTitle.innerHTML = "Enhanced Candidate Matching";
    cardBody.innerHTML =
      "Precise job recommendations aligning skills and preferences for efficient job searches.";

    cardTitle.setAttribute("class", "card-title");
    cardBody.setAttribute("class", "card-text");
    console.log("Done");
  }, 5000);
};
