from setuptools import find_packages, setup

setup(
    name='watchmap-django-sdk',
    packages=find_packages(),
    version='0.0.2',
    description='A SDK to connect to watchmap server',
    author='sudip-mondal-2002',
    license='MIT',
    install_requires=[
        'django',
        'requests',
        'django-environ'
    ]
)
