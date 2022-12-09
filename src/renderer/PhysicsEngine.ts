import { Ground } from '@/renderer/object/Ground';
import { Creature } from '@/wrapper/entities/Creature';
import { Entity } from '@/wrapper/entities/Entity';
import { Projectile } from '@/wrapper/entities/Projectile';

export class PhysicsEngine {

  private g: number = 0.16; //pixel per frame ^ 2 

  public gravitate(entity: Entity, ground: Ground): void {
    if (entity.isOnGround()) {
      return;
    }
    
    entity.setY(entity.getY() + entity.getYVelocity());
    entity.setYVelocity(Math.round((entity.getYVelocity() + this.g) * 100) / 100);
    
    if (entity.getRealY() + entity.getRealHeight() >= ground.getGroundY()) {
      entity.setOnGround(true);
    }
  }

  public distanceBetweenEntity(entity: Entity, target: Entity): number {
    return Math.sqrt(
      Math.pow((entity.getRealX()) - (target.getRealX()), 2) + Math.pow((entity.getRealY()) - (target.getRealY()), 2)
    );
  }

  public projectileMotion(projectile: Projectile, target: Entity, ground: Ground): boolean {
    if (projectile.isCollide(target) || projectile.isOnGround()) {
      return true;
    }

    const distance = this.distanceBetweenEntity(projectile, target);
    const xVelocity = ((target.getRealX() - projectile.getRealX()) / distance) * projectile.getSpeedMultiplier();
    const yVelocity = ((target.getRealY() - projectile.getRealY() + target.getRealHeight() / 2) / distance) * projectile.getSpeedMultiplier();

    projectile.setX(projectile.getX() + xVelocity);
    projectile.setY(projectile.getY() + yVelocity);

    if (projectile.getRealY() + projectile.getRealHeight() >= ground.getGroundY()) {
      projectile.setOnGround(true);
    }

    return false;
  }

  public getNearestCreature(creature: Creature, creatures: Creature[]): Creature {
    let nearestCreature: Creature = creatures[creatures.length - 1];
    let nearestDistance: number = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < creatures.length; i++) {
      const distance = this.distanceBetweenEntity(creature, creatures[i]);
      if (distance < nearestDistance && !creatures[i].isDieing()) {
        nearestCreature = creatures[i];
        nearestDistance = distance;
      }
    }

    return nearestCreature;
  }
}
