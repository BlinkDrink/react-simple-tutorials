import React, { Component } from "react";
import { useParams } from "react-router-dom";

class ProductDetails extends Component {
	handleSave = () => {
		// Navigate to /products
		this.props.history.push("/products");
	};

	render() {
		return (
			<div>
				<h1>Product Details - {this.props.match.params.id}</h1>
				<button onClick={this.handleSave}>Save</button>
			</div>
		);
	}
}

// const WrapperProductDetails = () => {
// 	const params = useParams();

// 	return <ProductDetails params={params} />;
// };

export default ProductDetails;
