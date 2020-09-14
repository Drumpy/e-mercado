let product = {};
let relatedProducts = {};
let comments = {};

function showImagesGallery(array) {

	let htmlContentToAppend = "";

	for (let i = 0; i < array.length; i++) {
		let imageSrc = array[i];

		htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

		document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
	}
}

function showRelatedProducts(array) {

	let htmlContentToAppend = "";

	for (let value of array) {

		let relatedProductsIndex = relatedProducts[value];

		htmlContentToAppend += `
			<div class="card mr-3" style="width: 18rem;">
  					<img src="${relatedProductsIndex.imgSrc}" class="card-img-top">
  				<div class="card-body">
    				<h5 class="card-title">${relatedProductsIndex.name}</h5>
    				<p class="card-text">${relatedProductsIndex.description}</p>
  				</div>
  				<div class="card-body">
    				<a href="#" class="card-link">Card link</a>
  				</div>
			</div>
		`;
	};

	document.getElementById("productRelated").innerHTML = htmlContentToAppend;
}

function showComments(array) {
	let htmlContentToAppend = "";

	for (let comment of array) {

		htmlContentToAppend += `
			<div class="list-group-item list-group-item-action">
				<div class="row">
					<div class="col-3 d-flex align-items-center">
						<img src="../img/user-avatar.png" alt="" class="img-thumbnail">
					</div>
					<div class="col">
						<div class="d-flex w-100 justify-content-between">
							<div class="mb-1">
								<h6 class="font-weight-bold">${comment.user} ${showScore(parseInt(comment.score))}</h6>
								<p>${comment.description}</p>
							</div>
							<small class="text-muted">${comment.dateTime}</small>
						</div>
					</div>
				</div>
        	</div>
		`;

		document.getElementById("comments").innerHTML = htmlContentToAppend;
	}
}

function showScore(score) {
	let stars = "";

	for (var i = 0; i < score; i++) {
		stars += `
			<span class="star-fill">★</span>
		`;
	}

	for (var j = score; j < 5; j++) {
		stars += `
			<span class="star">★</span>
		`;
	}

	return stars;
}

function addNewComment() {
	let newComment = document.getElementById("newComment").value;
	let addNewComment = document.getElementById("addNewComment");
	let userName = JSON.parse(localStorage.User);
	let newCommentData = {
		"description": newComment,
		"user": userName.email,
		"dateTime": formatDate()
	};

	console.log(newCommentData);

	comments.push(newCommentData);
	showComments(comments);
}

function formatDate() {
	let date = new Date();

	if ((date.getMonth() + 1) < 10) {
		var month = "0" + (date.getMonth() + 1);
	};
	if (date.getDate() < 32) {
		var day = "" + date.getDate();
	};
	var fullDate = date.getFullYear() + '-' + month + '-' + day;
	var hour = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	var fullDateAndHour = fullDate + ' ' + hour;

	return fullDateAndHour;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
		if (resultObj.status === "ok") {
			product = resultObj.data;

			let productNameHTML = document.getElementById("productName");
			let productPriceHTML = document.getElementById("productPrice");
			let productDescriptionHTML = document.getElementById("productDescription");
			let productCategoryHTML = document.getElementById("productCategory");
			let productSoldHTML = document.getElementById("productSold");

			productNameHTML.innerHTML = product.name;
			productPriceHTML.innerHTML = product.currency + " " + product.cost;
			productDescriptionHTML.innerHTML = product.description;
			productCategoryHTML.innerHTML = product.category;
			productSoldHTML.innerHTML = product.soldCount;

			//Muestro las imagenes en forma de galería
			showImagesGallery(product.images);
		}

		// Muestro los Productos Relacionados
		getJSONData(PRODUCTS_URL).then(function (resultObj) {
			if (resultObj.status === "ok") {
				relatedProducts = resultObj.data;
			}
			showRelatedProducts(product.relatedProducts);
		});
	});

	// Muestro los Comentarios
	getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
		if (resultObj.status === "ok") {
			comments = resultObj.data;
		}
		showComments(comments);
	});
});