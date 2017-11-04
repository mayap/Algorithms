## Task 1 - Frogs game

The game has a playground from 2N + 1 fields. In the beginning we have N frogs from the left - they are looking in the right direction, and N frogs from the right which are looking at the left direction. The purpose of the game is to switch the frogs so that the left will be on the right, and the frogs from the right will be on the left.

Rules for the game:
- each frog can move only to the direction it looks at
- each frog can jump onto a free leaf in front of it or jump over another frog and take the free leaf next to it.

Use Depth-First Search (DFS)
The output should be all the steps which are taken until the final solution, and the number of all steps.

<b>Example:</b>

N = 2

Output:

LL_RR

L_LRR

LRL_R

LRLR_

LR_RL

_RLRL

R_LRL

RRL_L

RR_LL


9
