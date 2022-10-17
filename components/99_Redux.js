const withConnect = Component => {
	Component = Redux.compose(
			listConnect,
			adminConnect,
		) (Component)

	return Component
}
