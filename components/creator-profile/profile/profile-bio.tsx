interface ProfileBioProps {
  bio?: string;
  features?: string[];
}

export function ProfileBio({ bio, features }: ProfileBioProps) {
  return (
    <div className="px-4 py-2 bg-white">
      {bio && <p className="text-sm text-gray-700 mb-2">{bio}</p>}
      {features && features.length > 0 && (
        <div className="space-y-1">
          {features.map((feature, index) => (
            <p key={index} className="text-sm text-gray-600">
              {feature}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
