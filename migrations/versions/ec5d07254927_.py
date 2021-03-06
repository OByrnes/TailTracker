"""empty message

Revision ID: ec5d07254927
Revises: 792b87f4680b
Create Date: 2021-03-31 13:00:08.613072

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ec5d07254927'
down_revision = '792b87f4680b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('activity_types',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=50), nullable=False),
    sa.Column('exertion', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('breeds',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('avg_activity_level', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('breed_img_url', sa.String(length=400), nullable=True),
    sa.Column('temperament', sa.String(length=400), nullable=True),
    sa.Column('bred_for', sa.String(length=175), nullable=True),
    sa.Column('life_span', sa.String(length=20), nullable=True),
    sa.Column('breed_group', sa.String(length=100), nullable=True),
    sa.Column('weight', sa.String(length=100), nullable=True),
    sa.Column('height', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('dogs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('breed_id', sa.Integer(), nullable=False),
    sa.Column('daily_goal', sa.Integer(), nullable=True),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('weight', sa.Integer(), nullable=True),
    sa.Column('description', sa.String(length=400), nullable=True),
    sa.Column('dog_img', sa.String(length=400), nullable=True),
    sa.ForeignKeyConstraint(['breed_id'], ['breeds.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('dogActivities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('dog_id', sa.Integer(), nullable=False),
    sa.Column('activityType_id', sa.Integer(), nullable=False),
    sa.Column('minutes', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['activityType_id'], ['activity_types.id'], ),
    sa.ForeignKeyConstraint(['dog_id'], ['dogs.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('dogActivities')
    op.drop_table('dogs')
    op.drop_table('breeds')
    op.drop_table('activity_types')
    # ### end Alembic commands ###
