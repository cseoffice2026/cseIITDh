const DOTS = Array.from({ length: 8 }, (_, index) => index);

export function DotsRing({ className = "" }) {
	return (
		<span
			className={`dots-ring relative inline-block shrink-0 text-[#19007B] ${className}`}
			style={{ fontSize: "1.5rem", animationDuration: "var(--duration, 1s)" }}
			role="status"
			aria-label="Loading"
		>
			{DOTS.map((dot) => (
				<span
					key={dot}
					aria-hidden="true"
					className="absolute left-1/2 top-1/2 h-[0.16em] w-[0.16em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current"
					style={{
						opacity: 1 - dot * 0.09,
						transform: `translate(-50%, -50%) rotate(${dot * 45}deg) translateY(-0.78em)`,
					}}
				/>
			))}
		</span>
	);
}
