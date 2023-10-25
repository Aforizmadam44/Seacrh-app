// bu keyi almaq ucun api saytindan qeydiyyatdan kecib, gotumek olur
const accessKey = "agA4iZnSyAuHCOU94Lkc12VTVtJcU9zQmTTebX4tkFw";

const input = document.querySelector(".input");
const searchBtn = document.querySelector(".searchBtn");
const content = document.querySelector(".content");
const xBtn = document.querySelector(".xBtn");

// search buttona basanda bu emeliyyatlar islesin
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // inputta axtardigim soz api daki hisseye elave olunsun deye deyisene menimsedilib
  const query = input.value;
  fetch(
    // api meshur photo sayti unsplashin api dir.
    // her axtarisda inputa yazdigim deyer query hissesine gelecek meselen query=baku ve id ise
    // hazir yuxaridaki access keye elave oluncaq
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      content.innerHTML = "";
      data.results
        .map((photo) => {
          // html terefde yaratdigim bos div e map ile loopladigim img leri otururem ve style verirem
          const img = document.createElement("img");
          img.src = photo.urls.regular; //hazir koddur, buradaki photo.urls.regular seklin orta olcude olmasi ucundu
          img.style.boxShadow = "0 0 15px white";
          img.style.borderRadius = "25px";
          img.classList.add("imgs");
          content.appendChild(img);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  // eger input degerim bos olsa ve click etsem search buttona sweet alert ile error versin
  if (input.value === "") {
    Swal.fire({
      icon: "error",
      title: "Cannot be left blank.",
      text: "Something went wrong!",
    });
  }
});
// inputa yazi yazanda, eger bos deyilse X buttonu cixsin, bosdursa, silinsin
input.addEventListener("keyup", function (e) {
  if (input.value.trim() !== "") {
    xBtn.style.display = "block";
  } else {
    xBtn.style.display = "none";
  }
});
// x buttonuna basanda sweet alert gelsin ve emeliyyatlar ede bilim
xBtn.addEventListener("click", function (e) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
  // burada ise x buttona basanda input ve axtarilan deyerlerin(sekillerin) icini bosaltsin.
  input.value = "";
  content.innerHTML = "";
});
