"""empty message

Revision ID: f12d275e8604
Revises: ac877649d75b
Create Date: 2021-04-03 19:23:18.513748

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f12d275e8604'
down_revision = 'ac877649d75b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('dogActivities', sa.Column('activity_img', sa.String(length=500), nullable=True))
    op.add_column('dogActivities', sa.Column('name', sa.String(length=100), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('dogActivities', 'name')
    op.drop_column('dogActivities', 'activity_img')
    # ### end Alembic commands ###
