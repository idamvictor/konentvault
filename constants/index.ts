import {
	Home,
	Heart,
	PlusCircle,
	User,
	Settings,
	Lock,
	ShieldCheck,
	KeyRound,
	MessagesSquare,
	Wallet,
	ShoppingCart,
	KeyRoundIcon,
} from "lucide-react";

export const TOKEN_TYPE = "Bearer ";
export const REQUEST_HEADER_AUTH_KEY = "Authorization";
export const PERSIST_STORE_NAME = "persist:root";

export const sidebarLinks = [
	{
		icon: Home,
		route: "/",
		label: "Home",
		roles: ["fan", "creator"], // visible to both
	},
	{
		icon: Wallet,
		route: "/wallet",
		label: "Wallet",
		roles: ["fan", "creator"],
	},
	{
		icon: Heart,
		route: "/my-subscriptions",
		label: "Subscriptions",
		roles: ["fan"],
	},
	{
		icon: ShoppingCart,
		route: "/u/purchases",
		label: "Purchases",
		roles: ["fan"],
	},
	{
		icon: KeyRoundIcon,
		route: "/u/earnings",
		label: "Earnings",
		roles: ["creator"],
	},
	{
		icon: KeyRoundIcon,
		route: "/u/payout-request",
		label: "Payout Request",
		roles: ["creator"],
	},
	{
		icon: PlusCircle,
		route: "/post/create",
		label: "Create Post",
		roles: ["creator"],
	},
	{
		icon: MessagesSquare,
		route: "/messages",
		label: "Messages",
		roles: ["fan", "creator"],
	},
	{
		icon: User,
		route: "/profile",
		label: "Profile",
		roles: ["fan", "creator"],
	},
	{
		icon: Settings,
		route: "/settings/account",
		label: "Settings",
		roles: ["fan", "creator"],
	},
];


export const settingsSidebar = [
	{
		label: "My Account",
		route: "/settings/account",
		icon: User,
	},
	{
		label: "Security Settings",
		route: "/settings/security",
		icon: Lock,
	},
	{
		label: "Subscription Settings",
		route: "/settings/subscription",
		icon: Settings,
	},
	{
		label: "Banking (To Earn)",
		route: "/settings/banking",
		icon: ShieldCheck,
	},
	{
		label: "Two-Factor Authentication",
		route: "/settings/two-factor",
		icon: KeyRound,
	},
	{
		label: "ID Verification",
		route: "/settings/id-verification",
		icon: KeyRound,
	},
];

export const securitySidebarLinks = [
	{
		label: "Change your password",
		description: "You can change your password here",
		route: "/settings/security/password",
	},
	{
		label: "Change your email",
		description: "You can change your email here",
		route: "/settings/security/email",
	},
	{
		label: "Two-Factor Authentication",
		description: "You can enable Two-Factor Authentication here",
		route: "/settings/security/two-factor",
	},
];

// gender
export const genderList = [
	{
		label: "Male",
		value: "male",
	},
	{
		label: "Female",
		value: "female",
	},
	{
		label: "Other",
		value: "other",
	},
];

export const countries = [
	{ label: "Afghanistan", value: "afghanistan" },
	{ label: "Albania", value: "albania" },
	{ label: "Algeria", value: "algeria" },
	{ label: "Andorra", value: "andorra" },
	{ label: "Angola", value: "angola" },
	{ label: "Argentina", value: "argentina" },
	{ label: "Armenia", value: "armenia" },
	{ label: "Australia", value: "australia" },
	{ label: "Austria", value: "austria" },
	{ label: "Azerbaijan", value: "azerbaijan" },
	{ label: "Bahamas", value: "bahamas" },
	{ label: "Bahrain", value: "bahrain" },
	{ label: "Bangladesh", value: "bangladesh" },
	{ label: "Barbados", value: "barbados" },
	{ label: "Belarus", value: "belarus" },
	{ label: "Belgium", value: "belgium" },
	{ label: "Belize", value: "belize" },
	{ label: "Benin", value: "benin" },
	{ label: "Bhutan", value: "bhutan" },
	{ label: "Bolivia", value: "bolivia" },
	{ label: "Bosnia and Herzegovina", value: "bosnia_and_herzegovina" },
	{ label: "Botswana", value: "botswana" },
	{ label: "Brazil", value: "brazil" },
	{ label: "Brunei", value: "brunei" },
	{ label: "Bulgaria", value: "bulgaria" },
	{ label: "Burkina Faso", value: "burkina_faso" },
	{ label: "Burundi", value: "burundi" },
	{ label: "Cambodia", value: "cambodia" },
	{ label: "Cameroon", value: "cameroon" },
	{ label: "Canada", value: "canada" },
	{ label: "Cape Verde", value: "cape_verde" },
	{ label: "Central African Republic", value: "central_african_republic" },
	{ label: "Chad", value: "chad" },
	{ label: "Chile", value: "chile" },
	{ label: "China", value: "china" },
	{ label: "Colombia", value: "colombia" },
	{ label: "Comoros", value: "comoros" },
	{ label: "Congo", value: "congo" },
	{ label: "Costa Rica", value: "costa_rica" },
	{ label: "Croatia", value: "croatia" },
	{ label: "Cuba", value: "cuba" },
	{ label: "Cyprus", value: "cyprus" },
	{ label: "Czech Republic", value: "czech_republic" },
	{ label: "Denmark", value: "denmark" },
	{ label: "Djibouti", value: "djibouti" },
	{ label: "Dominica", value: "dominica" },
	{ label: "Dominican Republic", value: "dominican_republic" },
	{ label: "Ecuador", value: "ecuador" },
	{ label: "Egypt", value: "egypt" },
	{ label: "El Salvador", value: "el_salvador" },
	{ label: "Equatorial Guinea", value: "equatorial_guinea" },
	{ label: "Eritrea", value: "eritrea" },
	{ label: "Estonia", value: "estonia" },
	{ label: "Eswatini", value: "eswatini" },
	{ label: "Ethiopia", value: "ethiopia" },
	{ label: "Fiji", value: "fiji" },
	{ label: "Finland", value: "finland" },
	{ label: "France", value: "france" },
	{ label: "Gabon", value: "gabon" },
	{ label: "Gambia", value: "gambia" },
	{ label: "Georgia", value: "georgia" },
	{ label: "Germany", value: "germany" },
	{ label: "Ghana", value: "ghana" },
	{ label: "Greece", value: "greece" },
	{ label: "Grenada", value: "grenada" },
	{ label: "Guatemala", value: "guatemala" },
	{ label: "Guinea", value: "guinea" },
	{ label: "Guinea-Bissau", value: "guinea_bissau" },
	{ label: "Guyana", value: "guyana" },
	{ label: "Haiti", value: "haiti" },
	{ label: "Honduras", value: "honduras" },
	{ label: "Hungary", value: "hungary" },
	{ label: "Iceland", value: "iceland" },
	{ label: "India", value: "india" },
	{ label: "Indonesia", value: "indonesia" },
	{ label: "Iran", value: "iran" },
	{ label: "Iraq", value: "iraq" },
	{ label: "Ireland", value: "ireland" },
	{ label: "Israel", value: "israel" },
	{ label: "Italy", value: "italy" },
	{ label: "Jamaica", value: "jamaica" },
	{ label: "Japan", value: "japan" },
	{ label: "Jordan", value: "jordan" },
	{ label: "Kazakhstan", value: "kazakhstan" },
	{ label: "Kenya", value: "kenya" },
	{ label: "Kiribati", value: "kiribati" },
	{ label: "Kuwait", value: "kuwait" },
	{ label: "Kyrgyzstan", value: "kyrgyzstan" },
	{ label: "Laos", value: "laos" },
	{ label: "Latvia", value: "latvia" },
	{ label: "Lebanon", value: "lebanon" },
	{ label: "Lesotho", value: "lesotho" },
	{ label: "Liberia", value: "liberia" },
	{ label: "Libya", value: "libya" },
	{ label: "Liechtenstein", value: "liechtenstein" },
	{ label: "Lithuania", value: "lithuania" },
	{ label: "Luxembourg", value: "luxembourg" },
	{ label: "Madagascar", value: "madagascar" },
	{ label: "Malawi", value: "malawi" },
	{ label: "Malaysia", value: "malaysia" },
	{ label: "Maldives", value: "maldives" },
	{ label: "Mali", value: "mali" },
	{ label: "Malta", value: "malta" },
	{ label: "Mauritania", value: "mauritania" },
	{ label: "Mauritius", value: "mauritius" },
	{ label: "Mexico", value: "mexico" },
	{ label: "Moldova", value: "moldova" },
	{ label: "Monaco", value: "monaco" },
	{ label: "Mongolia", value: "mongolia" },
	{ label: "Montenegro", value: "montenegro" },
	{ label: "Morocco", value: "morocco" },
	{ label: "Mozambique", value: "mozambique" },
	{ label: "Myanmar", value: "myanmar" },
	{ label: "Namibia", value: "namibia" },
	{ label: "Nepal", value: "nepal" },
	{ label: "Netherlands", value: "netherlands" },
	{ label: "New Zealand", value: "new_zealand" },
	{ label: "Nicaragua", value: "nicaragua" },
	{ label: "Niger", value: "niger" },
	{ label: "Nigeria", value: "nigeria" },
];

export const statesInNigeria = [
	{ label: "Abia", value: "abia" },
	{ label: "Adamawa", value: "adamawa" },
	{ label: "Akwa Ibom", value: "akwa_ibom" },
	{ label: "Anambra", value: "anambra" },
	{ label: "Bauchi", value: "bauchi" },
	{ label: "Bayelsa", value: "bayelsa" },
	{ label: "Benue", value: "benue" },
	{ label: "Borno", value: "borno" },
	{ label: "Cross River", value: "cross_river" },
	{ label: "Delta", value: "delta" },
	{ label: "Ebonyi", value: "ebonyi" },
	{ label: "Edo", value: "edo" },
	{ label: "Ekiti", value: "ekiti" },
	{ label: "Enugu", value: "enugu" },
	{ label: "Gombe", value: "gombe" },
	{ label: "Imo", value: "imo" },
	{ label: "Jigawa", value: "jigawa" },
	{ label: "Kaduna", value: "kaduna" },
	{ label: "Kano", value: "kano" },
	{ label: "Katsina", value: "katsina" },
	{ label: "Kebbi", value: "kebbi" },
	{ label: "Kogi", value: "kogi" },
	{ label: "Kwara", value: "kwara" },
	{ label: "Lagos", value: "lagos" },
	{ label: "Nasarawa", value: "nasarawa" },
	{ label: "Niger", value: "niger" },
	{ label: "Ogun", value: "ogun" },
	{ label: "Ondo", value: "ondo" },
	{ label: "Osun", value: "osun" },
	{ label: "Oyo", value: "oyo" },
	{ label: "Plateau", value: "plateau" },
	{ label: "Rivers", value: "rivers" },
	{ label: "Sokoto", value: "sokoto" },
	{ label: "Taraba", value: "taraba" },
	{ label: "Yobe", value: "yobe" },
	{ label: "Zamfara", value: "zamfara" },
	{ label: "Federal Capital Territory", value: "fct" },
];

export const documentTypes = [
	{
		label: "Passport",
		value: "passport",
	},
	{
		label: "National ID Card",
		value: "national_id_card",
	},
	{
		label: "Driver's License",
		value: "drivers_license",
	},
	{
		label: "Voter's Card",
		value: "voters_card",
	},
];

export const subscriptionPlans = [
	{
		label: "Free",
		value: "free",
	},
	{
		label: "Monthly",
		value: "monthly",
	},
	{
		label: "Quarterly",
		value: "quarterly",
	},
	{
		label: "Yearly",
		value: "yearly",
	},
];

// payment methods
export const paymentMethods = [
	{
		label: "Paystack",
		value: "paystack",
	},
];

//ppv, free, subscription,
export const postTypes = [
	{
		label: "Free",
		value: "free",
	},
		{
		label: "PPV",
		value: "ppv",
	},
	{
		label: "Subscription",
		value: "subscription",
	},
];

export const payoutPaymentMethods = [
	{
		label: "Paystack",
		value: "paystack",
	},
	{
		label: "bank",
		value: "bank",
	},
	{
		label: "other",
		value: "other",
	}
];
