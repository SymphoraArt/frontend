'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ExternalLink, Twitter, Globe, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { UniversalProfile } from '../lib/lukso/types';
import { getProfileImageURL, getBackgroundImageURL, getDisplayName, getProfileDescription, getProfileTags, isProfileVerified } from '../lib/lukso/profile';

interface UniversalProfileCardProps {
  profile: UniversalProfile;
  showActions?: boolean;
  compact?: boolean;
  className?: string;
}

export function UniversalProfileCard({
  profile,
  showActions = true,
  compact = false,
  className = ''
}: UniversalProfileCardProps) {
  const displayName = getDisplayName(profile);
  const description = getProfileDescription(profile);
  const tags = getProfileTags(profile);
  const profileImage = getProfileImageURL(profile);
  const backgroundImage = getBackgroundImageURL(profile);
  const isVerified = isProfileVerified(profile);

  const handleViewProfile = () => {
    window.open(`https://universalprofiles.cloud/${profile.address}`, '_blank');
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(profile.address);
    // You could add a toast here
  };

  if (compact) {
    return (
      <div className={`flex items-center space-x-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors ${className}`}>
        <Avatar className="h-10 w-10">
          <AvatarImage src={profileImage || undefined} alt={displayName} />
          <AvatarFallback>
            {displayName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <p className="font-medium text-sm truncate">{displayName}</p>
            {isVerified && (
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {profile.address.slice(0, 6)}...{profile.address.slice(-4)}
          </p>
        </div>

        {showActions && (
          <Button variant="ghost" size="sm" onClick={handleViewProfile}>
            <ExternalLink className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="h-32 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start space-x-4">
          {/* Profile Image */}
          <Avatar className="h-16 w-16 border-4 border-background">
            <AvatarImage src={profileImage || undefined} alt={displayName} />
            <AvatarFallback className="text-lg">
              {displayName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-bold text-lg truncate">{displayName}</h3>
              {isVerified && (
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-2 break-all">
              {profile.address}
            </p>

            {description && (
              <p className="text-sm text-foreground mb-3">{description}</p>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{tags.length - 3} more
                  </Badge>
                )}
              </div>
            )}

            {/* Links */}
            {profile.links && profile.links.length > 0 && (
              <div className="flex space-x-2 mb-3">
                {profile.links.slice(0, 2).map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(link.url, '_blank')}
                    className="h-7 px-2 text-xs"
                  >
                    <Globe className="h-3 w-3 mr-1" />
                    {link.title}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      {showActions && (
        <CardContent className="pt-0">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleViewProfile} className="flex-1">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Profile
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopyAddress}>
              Copy Address
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

// Compact version for lists
export function UniversalProfileListItem({ profile }: { profile: UniversalProfile }) {
  return <UniversalProfileCard profile={profile} compact showActions />;
}

// Mini version for mentions/references
export function UniversalProfileMention({ profile }: { profile: UniversalProfile }) {
  const displayName = getDisplayName(profile);
  const profileImage = getProfileImageURL(profile);

  return (
    <div className="inline-flex items-center space-x-2 px-2 py-1 rounded-full bg-accent text-accent-foreground">
      <Avatar className="h-4 w-4">
        <AvatarImage src={profileImage || undefined} alt={displayName} />
        <AvatarFallback className="text-xs">
          {displayName.slice(0, 1).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">{displayName}</span>
    </div>
  );
}
