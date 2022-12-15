import '../styles/globals.css'
import Script from 'next/script'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

	return (
		<>
			<Head>
				<title>Test</title>
				<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet" />
				<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css" rel="stylesheet" />
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.6.2/nouislider.css" integrity="sha512-30YMvFlZRwPH3TcDlPWZofkzGwIwDAKshEue1qWet2yWEQ4Y/X+WnV1aTuNldE3Hbpcl5Zz4PxoXJKMMQvBHGQ==" crossOrigin="anonymous" />
				<link rel="stylesheet" href="https://libraries.unbxdapi.com/search-sdk/v2.0.8/vanillaSearch.min.css" crossOrigin="anonymous" />
			</Head>

			<Script
				src="https://libraries.unbxdapi.com/search-sdk/v2.0.20/vanillaSearch.min.js"
				strategy="beforeInteractive"
				onLoad={() => {
					/* * * CONFIGURATION * * */
					UnbxdSiteName = "demo-unbxd700181503576558";
				}} />
			<Script
				src="https://d21gpk1vhmjuf5.cloudfront.net/unbxdAnalytics.js"
				strategy="beforeInteractive"

			/>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
