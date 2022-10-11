const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ESlintPlugin = require("eslint-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

const fileName = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);

const jsLoaders = () => {
	const loaders = [
		{
			loader: "babel-loader",
			options: {
				presets: ["@babel/preset-env"],
			},
		},
	];

	return loaders;
};

const plugins = [
	new HtmlWebpackPlugin({
		template: "index.html",
		minify: isProd,
	}),
	new MiniCssExtractPlugin({
		filename: fileName("css"),
	}),
	new CopyWebpackPlugin({
		patterns: [
			{
				from: path.resolve(__dirname, "src/favicon.ico"),
				to: path.resolve(__dirname, "dist"),
			},
		],
	}),
	new webpack.DefinePlugin({
		"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
	}),
];

if (isDev) {
	plugins.push(new ESlintPlugin());
}

module.exports = {
	context: path.resolve(__dirname, "src"),
	mode: "development",
	entry: "./index.js",
	output: {
		filename: fileName("js"),
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	resolve: {
		extensions: [".js"],
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@core": path.resolve(__dirname, "src/core"),
		},
	},
	devtool: isDev ? "source-map" : false,
	devServer: {
		port: 3000,
		hot: isDev,
	},
	plugins,
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: jsLoaders(),
			},
		],
	},
};
